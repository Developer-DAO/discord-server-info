- [Package management](#package-management)
- [High level technical overview](#high-level-technical-overview)

# Package management

This repo is a monorepo managed as a
[`pnpm` Workspace](https://pnpm.io/workspaces).

`pnpm` is a modern package manager that includes tools that make it easy to
manage a monorepo.

- To install packages: `pnpm i`
- To add a package: `pnpm add <package>`
- To remove a package: `pnpm rm <package>`
- To run a script: `pnpm run <script>`
- To run a script in all packages that have that script: `pnpm -r run <script>`

`pnpm` has powerful [Filtering](https://pnpm.io/filtering) functionality which
allows you to restrict commands to a specific subset of packages.

For example, to install a package for the `bot` package, we can run
`pnpm --filter bot add <package>`

For more information, read the [`pnpm` documentation](https://pnpm.io/).

# High level technical overview

To build `discord-server-info`, we'll need a few separate pieces:

- `bot`
- `db`
- `app`

![A diagram showing the bot, db, and app pieces and how they relate to each other](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9davjf2uj8bz0fcpnkiw.png)

`bot` will be a Discord bot. This bot reads data from the servers it's connected
to and stores it in our database (`db`).

`db` is a Prisma database that provides an API for storing and accessing server
data.

`app` is a Next.js application that allows users to authenticate with Discord
and explore data from their servers.

> If you're wondering why we need this structure rather than having the app read
> data directly from the Discord API, it's because the Discord API intentionally
> provides access to very little data. A bot account is required for full
> access.

The `discord-server-info` repo is a monorepo with a separate package for each
piece.
