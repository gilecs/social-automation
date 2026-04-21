# social-automation

Automates scheduled social posting from Notion to Telegram using Netlify Functions.

## What it does

This project reads scheduled content from a Notion database, checks whether each post is due, sends due posts to Telegram, and then marks successful posts as `Posted` in Notion.

## Current platform support

- Telegram

The Notion schema already supports multiple platforms, but only Telegram is implemented right now.

## Current architecture

### Source of truth
Notion database

### Execution flow
1. Query Notion for rows where `Status = Scheduled`
2. Filter to posts where `Scheduled At <= now`
3. If `Platforms` includes `telegram`, publish to Telegram
4. If publish succeeds, update the Notion row to `Posted`

### Scheduler
Netlify Scheduled Function

## Required Notion columns

Your Notion database should contain:

- `Title` — default Notion title column
- `Text` — Rich text
- `Scheduled At` — Date
- `Status` — Select
- `Platforms` — Multi-select
- `Media URL` — URL (optional)

## Required Status values

- `Draft`
- `Scheduled`
- `Posted`

## Supported Platforms values

- `telegram`
- `facebook`
- `linkedin`

Only `telegram` is implemented right now.

## Environment variables

Create a local `.env` file from `.env.example`.

Required variables:

- `NOTION_API_KEY`
- `NOTION_DB_ID`
- `TG_TOKEN`
- `TG_CHAT`

## Local development

Install dependencies:

```bash
npm install

## To Run locally

npm run scheduler:run

## Run Netify Locally

npm run dev:netlify

##Local function endpoint

http://localhost:8888/.netlify/functions/scheduler
