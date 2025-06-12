import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "4px 12px",
    marginBottom: "6px",
    borderRadius: "4px",
    backgroundColor: isDragging ? "#1a1a1a" : "rgba(255, 255, 255, 0.95)",
    color: isDragging ? "#ffff" : "#111827",
    fontWeight: 500,
    fontSize: "18px",
    textAlign: "center",
    boxShadow: isDragging
      ? "0 4px 10px rgba(0,0,0,0.2)"
      : "0 1px 3px rgba(0,0,0,0.05)",
    border: "2px solid #ffff",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="nodrag"
      {...attributes}
      {...listeners}
    >
      {id}
    </div>
  );
}

export function reorderSections(list, fromIndex, toIndex) {
  if (fromIndex === toIndex) return list;
  return arrayMove(list, fromIndex, toIndex);
}

export default function HomeSections({ sections, onChange }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.indexOf(active.id);
    const newIndex = sections.indexOf(over.id);
    const newSections = reorderSections(sections, oldIndex, newIndex);
    onChange(newSections);
  };

  return (
    <div
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-white font-semibold text-lg text-center bg-[#0f0f0f] py-3 px-4 rounded-t-md shadow-md tracking-wide">
        Home Sections
      </h3>

      <div className="px-4 py-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
