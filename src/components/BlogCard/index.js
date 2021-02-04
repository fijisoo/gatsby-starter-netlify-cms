import React from "react";
import Image from "../Image";
import { Link } from "gatsby";
import { Button } from "../Button";
import cn from "classnames";

import "./blog-card.scss";
import { tagsColors, tagsColorsBlurred } from "../../utlis/tagsColors";

const BlogCard = ({ post, isSocialToggled, mainTag }) => {
  const mainColorBlurred = tagsColorsBlurred[mainTag];
  const mainColor = tagsColors[mainTag];

  const linkAddr = post.fields.slug.replace("/blog", "");

  console.log("post", post);

  if (!post.frontmatter.featuredimage && !post.excerpt) {
      const mainColorBlurredTitleBackground = tagsColorsBlurred['angery'];
    return (
      <article
        style={{ borderColor: mainColorBlurred || mainColorBlurredTitleBackground }}
        className={cn("blog-item", "blog-item-only-title", {
          "blog-item--social-toggled": isSocialToggled,
        })}
      >
        <p className="blog-item__description blog-item__description--only-title">
          <span className="blog-item__description-title">
            {post.frontmatter.title}
          </span>
        </p>
      </article>
    );
  }

  if (!post.excerpt) {
    return (
      <article
        data-mainColor={mainColorBlurred}
        style={{ borderColor: mainColorBlurred }}
        className={cn("blog-item", {
          "blog-item--featured": post.frontmatter.featuredpost,
          "blog-item--social-toggled": isSocialToggled,
          [`blog-item--${mainColorBlurred}`]: isSocialToggled,
        })}
      >
        <Image
          className="blog-item__image blog-item__image--full-size"
          imageInfo={{
            image: post.frontmatter.featuredimage,
            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
          }}
        />
      </article>
    );
  }

  console.log(
    "!post.frontmatter.featuredimage",
    !post.frontmatter.featuredimage,
    !post.excerpt
  );

  return (
    <article
      style={{ borderColor: mainColorBlurred }}
      className={cn("blog-item", "blog-item--with-content", {
        "blog-item--social-toggled": isSocialToggled,
        "blog-item--featured": post.frontmatter.featuredpost,
      })}
    >
      <header className="blog-item__header">
        {post.frontmatter.featuredimage && (
          <div className="image-wrapper" style={{ ["--color"]: mainColor }}>
            <Image
              className="blog-item__image"
              imageInfo={{
                image: post.frontmatter.featuredimage,
                alt: `featured image thumbnail for post ${post.frontmatter.title}`,
              }}
            />
          </div>
        )}
        <p className="blog-item__header-meta">
          <span className="">{post.frontmatter.date}</span>
          <span className="">~ {post.frontmatter.author || "HOST"}</span>
        </p>
      </header>
      <p className="blog-item__description">
        <Link className="blog-item__description-title" to={linkAddr}>
          {post.frontmatter.title}
        </Link>
        <span className="blog-item__description-text">{post.excerpt}</span>
        <Button
          className="blog-item__description-link"
          link={linkAddr}
          text="ENTRANCE"
        />
      </p>
    </article>
  );
};

export default BlogCard;
