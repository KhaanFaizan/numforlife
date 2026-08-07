"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Download,
  GripVertical,
  ImageIcon,
  LayoutGrid,
  Megaphone,
  MessageSquareQuote,
  Sparkles,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  BLOCK_LABELS,
  EDITABLE_BLOCK_TYPES,
  type HomepageBlock,
  type HomepageBlockType,
} from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const BLOCK_ICONS: Record<HomepageBlockType, LucideIcon> = {
  hero: Megaphone,
  gallery: ImageIcon,
  brand: Sparkles,
  "app-download": Download,
  about: Users,
  features: LayoutGrid,
  results: Trophy,
  partners: Star,
  testimonials: MessageSquareQuote,
  footer: Users,
};

type BlockEditorProps = {
  blocks: HomepageBlock[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (blocks: HomepageBlock[]) => void;
};

function SortableBlockItem({
  block,
  index,
  selected,
  onSelect,
}: {
  block: HomepageBlock;
  index: number;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const editable = EDITABLE_BLOCK_TYPES.includes(block.type);
  const Icon = BLOCK_ICONS[block.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-2xl border bg-white p-2.5 transition-all",
        selected
          ? "border-accent/60 bg-accent/[0.04] shadow-[0_0_0_1px_rgba(255,193,7,0.5),0_8px_24px_rgba(255,193,7,0.12)]"
          : "border-black/[0.06] hover:border-black/10 hover:shadow-sm",
        isDragging && "z-10 scale-[1.02] shadow-xl",
      )}
    >
      {selected && (
        <div className="absolute top-3 bottom-3 left-0 w-[3px] rounded-full bg-accent" />
      )}

      <button
        type="button"
        className="cursor-grab rounded-xl p-2 text-black/25 transition-colors hover:bg-black/[0.04] hover:text-black/50 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => onSelect(block.id)}
        className="flex flex-1 items-center gap-3 text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f5] font-mono text-[11px] font-bold text-black/40">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            selected ? "bg-accent/20 text-black" : "bg-black/[0.04] text-black/50",
          )}
        >
          <Icon className="h-4 w-4" />
        </span>

        <span className="min-w-0 flex-1">
          <p className="truncate font-sans text-[13px] font-semibold text-black">
            {BLOCK_LABELS[block.type]}
          </p>
          <p className="font-mono text-[10px] text-black/35">{block.type}</p>
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium",
            editable
              ? "bg-accent/15 text-black/70"
              : "bg-black/[0.04] text-black/35",
          )}
        >
          {editable ? "Editable" : "Static"}
        </span>
      </button>
    </div>
  );
}

export function BlockEditor({
  blocks,
  selectedId,
  onSelect,
  onReorder,
}: BlockEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);
    onReorder(arrayMove(blocks, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map((block) => block.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {blocks.map((block, index) => (
            <SortableBlockItem
              key={block.id}
              block={block}
              index={index}
              selected={selectedId === block.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export function getSelectedBlockType(
  blocks: HomepageBlock[],
  selectedId: string | null,
): HomepageBlockType | null {
  const block = blocks.find((item) => item.id === selectedId);
  return block?.type ?? null;
}
