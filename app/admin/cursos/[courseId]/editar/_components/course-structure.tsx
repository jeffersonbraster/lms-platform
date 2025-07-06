"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CourseStructure = () => {
  const [items, setItems] = useState(["1", "2", "3"]);

  function SortableItem(props) {
    const { attributes, listeners, setNodeRef, transition, transform } =
      useSortable({
        id: props.id,
      });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {props.id}
      </div>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if(active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      })
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-border">
          <CardTitle>Capítulos</CardTitle>
        </CardHeader>

        <CardContent>
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={items}
          >
            {items.map((item) => (
              <SortableItem key={item} id={item} />
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  );
};

export default CourseStructure;
