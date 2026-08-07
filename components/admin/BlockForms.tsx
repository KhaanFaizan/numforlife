"use client";

import { Plus } from "lucide-react";
import type { CMSContent } from "@/lib/cms/types";
import {
  AdminButton,
  AdminField,
  AdminFormCard,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/ui/AdminButton";

type BlockFormProps = {
  draft: CMSContent;
  onChange: (next: CMSContent) => void;
};

export function HeroBlockForm({ draft, onChange }: BlockFormProps) {
  return (
    <div className="space-y-5">
      <AdminField label="Hero Subtitle" hint="Small text above the main headline">
        <input
          className={adminInputClass}
          value={draft.hero.tagline}
          onChange={(e) =>
            onChange({
              ...draft,
              hero: { ...draft.hero, tagline: e.target.value },
            })
          }
        />
      </AdminField>

      <AdminField
        label="Hero Title"
        hint="Enter one line per row — each line becomes a headline row"
      >
        <textarea
          rows={4}
          className={adminTextareaClass}
          value={draft.hero.titleLines.join("\n")}
          onChange={(e) =>
            onChange({
              ...draft,
              hero: {
                ...draft.hero,
                titleLines: e.target.value.split("\n").filter(Boolean),
              },
            })
          }
        />
      </AdminField>

      <AdminField label="Hero Button Text">
        <input
          className={adminInputClass}
          value={draft.hero.buttonText}
          onChange={(e) =>
            onChange({
              ...draft,
              hero: { ...draft.hero, buttonText: e.target.value },
            })
          }
        />
      </AdminField>
    </div>
  );
}

export function GalleryBlockForm({ draft, onChange }: BlockFormProps) {
  const updateImage = (
    id: string,
    field: "src" | "alt",
    value: string,
  ) => {
    onChange({
      ...draft,
      gallery: {
        images: draft.gallery.images.map((image) =>
          image.id === id ? { ...image, [field]: value } : image,
        ),
      },
    });
  };

  const addImage = () => {
    onChange({
      ...draft,
      gallery: {
        images: [
          ...draft.gallery.images,
          {
            id: `gallery-${Date.now()}`,
            src: "",
            alt: "New image",
            tall: true,
          },
        ],
      },
    });
  };

  const removeImage = (id: string) => {
    onChange({
      ...draft,
      gallery: {
        images: draft.gallery.images.filter((image) => image.id !== id),
      },
    });
  };

  return (
    <div className="space-y-5">
      {draft.gallery.images.map((image, index) => (
        <AdminFormCard
          key={image.id}
          title={`Image ${index + 1}`}
          index={index}
          onRemove={() => removeImage(image.id)}
        >
          <AdminField label="Image URL">
            <input
              className={adminInputClass}
              value={image.src}
              onChange={(e) => updateImage(image.id, "src", e.target.value)}
            />
          </AdminField>
          <AdminField label="Alt Text">
            <input
              className={adminInputClass}
              value={image.alt}
              onChange={(e) => updateImage(image.id, "alt", e.target.value)}
            />
          </AdminField>
        </AdminFormCard>
      ))}

      <AdminButton
        type="button"
        variant="ghost"
        onClick={addImage}
        className="w-full border border-dashed border-black/10 py-3"
      >
        <Plus className="h-4 w-4" />
        Add Image
      </AdminButton>
    </div>
  );
}

export function FeaturesBlockForm({ draft, onChange }: BlockFormProps) {
  const updateFeature = (
    id: string,
    field: "title" | "description" | "icon",
    value: string,
  ) => {
    onChange({
      ...draft,
      features: {
        ...draft.features,
        items: draft.features.items.map((item) =>
          item.id === id ? { ...item, [field]: value } : item,
        ),
      },
    });
  };

  const addFeature = () => {
    onChange({
      ...draft,
      features: {
        ...draft.features,
        items: [
          ...draft.features.items,
          {
            id: `feature-${Date.now()}`,
            title: "New Feature",
            description: "Feature description",
            icon: "/icons/ecosystem/1.png",
          },
        ],
      },
    });
  };

  const removeFeature = (id: string) => {
    onChange({
      ...draft,
      features: {
        ...draft.features,
        items: draft.features.items.filter((item) => item.id !== id),
      },
    });
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Section Label">
          <input
            className={adminInputClass}
            value={draft.features.sectionLabel}
            onChange={(e) =>
              onChange({
                ...draft,
                features: { ...draft.features, sectionLabel: e.target.value },
              })
            }
          />
        </AdminField>

        <AdminField label="Section Heading">
          <input
            className={adminInputClass}
            value={draft.features.sectionHeading}
            onChange={(e) =>
              onChange({
                ...draft,
                features: { ...draft.features, sectionHeading: e.target.value },
              })
            }
          />
        </AdminField>
      </div>

      {draft.features.items.map((item, index) => (
        <AdminFormCard
          key={item.id}
          title={item.title || `Feature ${index + 1}`}
          index={index}
          onRemove={() => removeFeature(item.id)}
        >
          <AdminField label="Title">
            <input
              className={adminInputClass}
              value={item.title}
              onChange={(e) => updateFeature(item.id, "title", e.target.value)}
            />
          </AdminField>
          <AdminField label="Icon URL">
            <input
              className={adminInputClass}
              value={item.icon}
              onChange={(e) => updateFeature(item.id, "icon", e.target.value)}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              rows={3}
              className={adminTextareaClass}
              value={item.description}
              onChange={(e) =>
                updateFeature(item.id, "description", e.target.value)
              }
            />
          </AdminField>
        </AdminFormCard>
      ))}

      <AdminButton
        type="button"
        variant="ghost"
        onClick={addFeature}
        className="w-full border border-dashed border-black/10 py-3"
      >
        <Plus className="h-4 w-4" />
        Add Feature
      </AdminButton>
    </div>
  );
}

export function FooterBlockForm({ draft, onChange }: BlockFormProps) {
  const updateLink = (
    index: number,
    field: "label" | "href",
    value: string,
  ) => {
    onChange({
      ...draft,
      footer: {
        ...draft.footer,
        links: draft.footer.links.map((link, i) =>
          i === index ? { ...link, [field]: value } : link,
        ),
      },
    });
  };

  return (
    <div className="space-y-5">
      <AdminField label="Section Title">
        <input
          className={adminInputClass}
          value={draft.footer.title}
          onChange={(e) =>
            onChange({
              ...draft,
              footer: { ...draft.footer, title: e.target.value },
            })
          }
        />
      </AdminField>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Email">
          <input
            className={adminInputClass}
            value={draft.footer.email}
            onChange={(e) =>
              onChange({
                ...draft,
                footer: { ...draft.footer, email: e.target.value },
              })
            }
          />
        </AdminField>

        <AdminField label="Copyright">
          <input
            className={adminInputClass}
            value={draft.footer.copyright}
            onChange={(e) =>
              onChange({
                ...draft,
                footer: { ...draft.footer, copyright: e.target.value },
              })
            }
          />
        </AdminField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Contact Text">
          <input
            className={adminInputClass}
            value={draft.footer.contactText}
            onChange={(e) =>
              onChange({
                ...draft,
                footer: { ...draft.footer, contactText: e.target.value },
              })
            }
          />
        </AdminField>

        <AdminField label="Address Text">
          <input
            className={adminInputClass}
            value={draft.footer.addressText}
            onChange={(e) =>
              onChange({
                ...draft,
                footer: { ...draft.footer, addressText: e.target.value },
              })
            }
          />
        </AdminField>
      </div>

      <AdminFormCard title="Footer Links">
        <div className="space-y-3">
          {draft.footer.links.map((link, index) => (
            <div
              key={`${link.label}-${index}`}
              className="grid gap-3 md:grid-cols-2"
            >
              <input
                className={adminInputClass}
                value={link.label}
                placeholder="Label"
                onChange={(e) => updateLink(index, "label", e.target.value)}
              />
              <input
                className={adminInputClass}
                value={link.href}
                placeholder="URL"
                onChange={(e) => updateLink(index, "href", e.target.value)}
              />
            </div>
          ))}
        </div>
      </AdminFormCard>
    </div>
  );
}
