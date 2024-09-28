import { CREATOR_VIDEO_CATEGORIES } from "@dragverse/constants";
import { getCategoryByTag } from "@dragverse/generic";
import { Select, SelectItem } from "@dragverse/ui";

import useAppStore from "@/lib/store";

const MediaCategory = () => {
  const uploadedMedia = useAppStore((state) => state.uploadedMedia);
  const setUploadedMedia = useAppStore((state) => state.setUploadedMedia);
  return (
    <div className="flex-1 space-y-1">
      <span className="font-medium text-sm">Category</span>

      <Select
        value={uploadedMedia.mediaCategory.tag}
        onValueChange={(tag) =>
          setUploadedMedia({ mediaCategory: getCategoryByTag(tag) })
        }
      >
        {CREATOR_VIDEO_CATEGORIES.map((category) => (
          <SelectItem key={category.tag} value={category.tag}>
            {category.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default MediaCategory;
