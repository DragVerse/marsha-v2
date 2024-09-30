## ✨ About

At [**Dragverse**](https://dragverse.io), we're not just building the next generation of the internet; we're redefining social media as a vibrant ecosystem where the art of drag and the rich diversity of the LGBTQIA+ community—and its allies—are the stars.

Built using Lens Protocol and forked from the Tape project 🌿

## ✨ Community

For a place to have open discussions on features, voice your ideas, or get help with general questions please visit our community on [WhatsApp](https://chat.whatsapp.com/C7dXsMk9Som5ZPI5WDYH5k).

## ✨ Demo

https://user-images.githubusercontent.com/8083958/222954569-b88fde67-8b95-466d-aadf-e5c9542d9601.mp4

[Dragverse Video](https://dragverse.app/watch/0x70a8-0x01)  
[Youtube Video](https://youtu.be/65LG2dkBcBI)

## ✨ Deployments

| Name    | Link                                   |
| ------- | -------------------------------------- |
| Mainnet | [dragverse.app](https://dragverse.app) |

> [!NOTE]
> This monorepo uses [Pnpm](https://pnpm.io/) as a package manager. It includes the following apps and packages.

#### 🌐 Apps

| Name    | Description                    |
| ------- | ------------------------------ |
| `web`   | Frontend application           |
| `embed` | Embed Video Player             |
| `cron`  | Cron jobs for background tasks |
| `api`   | Backend application            |
| `og`    | Open graph meta tags generator |

#### 📦 Packages

| Name        | Description                          |
| ----------- | ------------------------------------ |
| `abis`      | Contract Interfaces                  |
| `config`    | Shared lint config                   |
| `constants` | Constants for the entire application |
| `contracts` | Permissionless signup contracts      |
| `generic`   | Collection of generic helpers        |
| `server`    | Collection of server helpers         |
| `browser`   | Collection of client helpers         |
| `lens`      | Everything related to lens indexer   |
| `ui`        | Web UI components                    |

## ✨ Getting Started

Install all dependencies from repository root,

```bash
pnpm install
```

Start the application,

```bash
pnpm dev
```

and visit http://localhost:4783

## ✨ Deploying the application

Build all dependencies from repository root,

```bash
pnpm build
```

To deploy on Vercel, use the following configuration:
<img width="917" alt="Screenshot 2023-03-01 at 11 18 04 AM" src="https://user-images.githubusercontent.com/8083958/222251470-bf9be5f8-a172-4eac-930c-d7d557880787.png">

<img width="899" alt="Screenshot 2023-03-01 at 12 55 51 PM" src="https://user-images.githubusercontent.com/8083958/222251898-e8486738-a85e-4e35-99f4-781da701468c.png">

## ✨ Contributors

We love contributors! Dragverse uses work contributed from the Tape team. Feel free to contribute to this project but please read the [Contributing Guidelines](CONTRIBUTING.md) before opening an issue or PR so you understand the branching strategy and local development environment.

<a href="https://github.com/dragverse/marsha-v2/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dragverse/marsha-v2" />
</a>

## ✨ License

Dragverse codebase is open-sourced software licensed under the [AGPLv3](LICENSE).
