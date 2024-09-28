import { DRAGVERSE_LOGO, TAPE_APP_NAME } from "@dragverse/constants";
import { imageCdn } from "@dragverse/generic";
import type { ChildrenNode, MatchResponse, Node } from "interweave";
import { Matcher } from "interweave";
import Link from "next/link";
import { createElement } from "react";
import type { UrlMatcherOptions, UrlProps } from "./utils";
import { EMAIL_DISTINCT_PATTERN, URL_PATTERN } from "./utils";

export type UrlMatch = Pick<UrlProps, "url" | "urlParts">;

const Url = ({ children, url, ...props }: UrlProps) => {
  let href = url;

  if (!/^https?:\/\//.test(href)) {
    href = `http://${href}`;
  }

  return href?.includes("tape.xyz/watch") || href?.includes("tape.xyz/u") ? (
    <Link
      href={href}
      className="inline-flex items-center space-x-1 rounded-full bg-gray-200 px-2 font-medium text-sm dark:bg-gray-800"
    >
      <img
        src={imageCdn(`${DRAGVERSE_LOGO}`, "SQUARE")}
        className="size-4"
        draggable={false}
        alt={TAPE_APP_NAME}
      />
      <span>{href}</span>
    </Link>
  ) : (
    <Link {...props} href={href} target="_blank">
      {children}
    </Link>
  );
};

export class UrlMatcher extends Matcher<UrlProps, UrlMatcherOptions> {
  constructor(
    name: string,
    options?: UrlMatcherOptions,
    factory?: React.ComponentType<UrlProps> | null
  ) {
    super(
      name,
      {
        customTLDs: [],
        validateTLD: true,
        ...options
      },
      factory
    );
  }

  replaceWith(children: ChildrenNode, props: UrlProps): Node {
    return createElement(Url, props, children);
  }

  asTag(): string {
    return "a";
  }

  match(string: string): MatchResponse<UrlMatch> | null {
    const response = this.doMatch(string, URL_PATTERN, this.handleMatches);

    if (response?.match.match(EMAIL_DISTINCT_PATTERN)) {
      response.valid = false;
    }

    return response;
  }

  /**
   * Package the matched response.
   */
  handleMatches(matches: string[]): UrlMatch {
    return {
      url: matches[0] || "",
      urlParts: {
        auth: matches[2] ? matches[2].slice(0, -1) : "",
        fragment: matches[7] || "",
        host: matches[3] || "",
        path: matches[5] || "",
        port: matches[4] ? matches[4] : "",
        query: matches[6] || "",
        scheme: matches[1] ? matches[1].replace("://", "") : "http"
      }
    };
  }
}
