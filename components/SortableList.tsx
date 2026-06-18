"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import React, { useState, useEffect } from "react";

interface SortableListProps<T> {
  items: T[];
  onReorder: (newItems: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function SortableList<T>({ items, onReorder, renderItem, keyExtractor }: SortableListProps<T>) {
  const [isMounted, setIsMounted] = useState(false);
  const [localItems, setLocalItems] = useState<T[]>(items);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync with server state
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  if (!isMounted) return null;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(localItems);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);

    // Optimistic update
    setLocalItems(newItems);
    
    // Notify parent to trigger server action
    onReorder(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sortable-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-border">
            {localItems.map((item, index) => {
              const key = keyExtractor(item);
              return (
                <Draggable key={key} draggableId={key} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center gap-2 transition-colors ${snapshot.isDragging ? "bg-card shadow-xl ring-1 ring-accent z-50 rounded-xl" : "hover:bg-card/30"}`}
                      style={provided.draggableProps.style}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="p-3 text-text-muted hover:text-accent cursor-grab active:cursor-grabbing flex-shrink-0"
                      >
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div className="flex-grow min-w-0">
                        {renderItem(item, index)}
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
