# Project instructions

## Blog edit dates

- Whenever a blog is edited, including changes to text, images, links, Instagram URLs, or frontmatter, set its `updatedDate` to the date of that edit in `YYYY-MM-DD` format, using Asia/Kolkata time.
- Preserve `pubDate` as the original publication date.
- The blog's “Last updated” label should use `updatedDate`, falling back to `pubDate` for older posts without it.
- Do not refresh dates merely for a build or deployment when the blog itself has not changed.

## Publishing

- Show the preview URL with each pull request.
- Obtain explicit user approval before merging and deploying to production.
