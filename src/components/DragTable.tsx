import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import React, { useEffect, useState } from 'react';
import { useServerStore } from '~/store';

export interface DragTableProps {}

export interface SortableItemProps {
  value: string;
  index: number;
}

export interface SortableListProps {
  items: string[];
}

const SortableItem = SortableElement(({ value, itemIndex }: SortableItemProps) => {
  const colorClasses = [
    'bg-green-700',
    'bg-green-600',
    'bg-green-500',
    'bg-green-400',
    'bg-green-300',
    'bg-green-200',
    'bg-green-100',
  ];

  const colorClass = colorClasses[itemIndex % colorClasses.length];
  return (
    <li
      className={`p-1 border border-app_primary rounded my-2 text-white cursor-pointer ${colorClass}`}
      tabIndex={0}
      style={{ listStyleType: 'none', userSelect: 'none' }}
    >
      {value}
    </li>
  );
});

const SortableList = SortableContainer(({ items }: SortableListProps) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} itemIndex={index} value={value} />
      ))}
    </ul>
  );
});

export const DragTable = (props: DragTableProps) => {
  const { serverList } = useServerStore();
  const [dataSource, setDataSource] = useState<string[]>([]);

  // On component mount, restore serverList from localStorage if it exists, otherwise from global state
  useEffect(() => {
    const savedServerList = localStorage.getItem('serverList');
    if (savedServerList) {
      const parsedList = JSON.parse(savedServerList) as string[];
      setDataSource(parsedList);
    } else {
      setDataSource(serverList);
      localStorage.setItem('serverList', JSON.stringify(serverList));
    }
  }, []);

  // When serverList changes, update dataSource and save to localStorage
  useEffect(() => {
    const savedServerList = localStorage.getItem('priorityList');
    if (savedServerList) {
      let parsedList = JSON.parse(savedServerList) as string[];
      // Filter out servers that are not in the new serverList
      parsedList = parsedList.filter((server) => serverList.includes(server));
      // Add new servers from the new serverList
      const newServers = serverList.filter((server) => !parsedList.includes(server));
      parsedList = [...parsedList, ...newServers];
      setDataSource(parsedList);
      localStorage.setItem('priorityList', JSON.stringify(parsedList));
    } else {
      setDataSource(serverList);
      localStorage.setItem('priorityList', JSON.stringify(serverList));
    }
  }, [serverList]);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newItems = arrayMove(dataSource, oldIndex, newIndex);
    setDataSource(newItems);
    localStorage.setItem('priorityList', JSON.stringify(newItems));
  };

  return (
    <>
      <h1 className="text-center text-green-800 font-sans text-[18px]  ">Nguồn truyện ưu tiên</h1>
      <SortableList items={dataSource} onSortEnd={onSortEnd}></SortableList>
    </>
  );
};
