import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const loader = new URL("../src/lib/content.ts", import.meta.url).href;

test("public content honors draft boundaries and editorial project order", () => {
  const root = mkdtempSync(join(tmpdir(), "myblog-content-"));
  try {
    for (const type of ["articles", "projects"])
      mkdirSync(join(root, "content", type), { recursive: true });
    const write = (type, slug, metadata) =>
      writeFileSync(
        join(root, "content", type, `${slug}.mdx`),
        `---\n${Object.entries(metadata)
          .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
          .join("\n")}\n---\n\nProject body.`,
      );
    write("projects", "recent", {
      title: "Recent",
      date: "2026-10-11",
      featured: true,
      featuredOrder: 2,
    });
    write("projects", "focus", {
      title: "Focus",
      date: "2026-01-01",
      featured: true,
      featuredOrder: 1,
      status: "开发中",
      cover: "/images/demo.png",
    });
    write("projects", "unordered", {
      title: "Unordered",
      date: "2026-12-01",
      featured: true,
      featuredOrder: "0",
    });
    write("projects", "hidden", {
      title: "Hidden",
      date: "2027-01-01",
      featured: true,
      featuredOrder: 0,
      draft: true,
      tags: ["private"],
    });
    write("articles", "draft", {
      title: "Draft",
      date: "2026-10-01",
      draft: true,
      tags: ["private"],
    });
    const result = spawnSync(
      process.execPath,
      [
        "--experimental-strip-types",
        "--input-type=module",
        "-e",
        `
      import {getAllArticles,getAllProjects,getFeaturedProjects,getContentBySlug,getAllTags} from ${JSON.stringify(loader)};
      console.log(JSON.stringify({articles:getAllArticles(),projects:getAllProjects(),featured:getFeaturedProjects(2).map(p=>p.slug),
        hidden:getContentBySlug('projects','hidden')??null,tags:getAllTags()}));
    `,
      ],
      { cwd: root, encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);
    const data = JSON.parse(result.stdout);
    assert.deepEqual(data.featured, ["focus", "recent"]);
    assert.equal(data.projects.length, 3);
    assert.equal(
      data.projects.find((item) => item.slug === "unordered").featuredOrder,
      undefined,
    );
    assert.equal(
      data.projects.find((item) => item.slug === "focus").status,
      "开发中",
    );
    assert.equal(
      data.projects.find((item) => item.slug === "focus").cover,
      "/images/demo.png",
    );
    assert.deepEqual(data.articles, []);
    assert.equal(data.hidden, null);
    assert.deepEqual(data.tags, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
