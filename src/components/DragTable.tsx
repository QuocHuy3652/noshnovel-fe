import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import React from 'react';


export interface  DragTableProps {

}

export interface SortableListProps {
  data: any
}

const data = {
  items: [
    {
    id: 1,
    name: 'truyenfull.vn',
    description: 'Novel description',
    genre: 'Action',
    author: 'Author name',
    source: 'Novel source',
    },
    {
      id: 2,
      name: 'tangthuvien.com',
      description: 'Novel description',
      genre: 'Action',
      author: 'Author name',
      source: 'Novel source',
    },
    {
      id: 3,
      name: 'santruyen.com',
      description: 'Novel description',
      genre: 'Action',
      author: 'Author name',
      source: 'Novel source',
    },
    {
      id: 4,
      name: 'truyenconlon.vn',
      description: 'Novel description',
      genre: 'Action',
      author: 'Author name',
      source: 'Novel source',
    },
    {
      id: 5,
      name: 'truyen18+.vn',
      description: 'Novel description',
      genre: 'Action',
      author: 'Author name',
      source: 'Novel source',
    },
  ]
}


const SortableItem = SortableElement(({value}) => (
  <li className="p-1 border border-app_primary rounded my-2 !text-app_primary" tabIndex={0}>{value}</li>
));

const SortableList = SortableContainer(({ data }: SortableListProps) => {
  return (
    <ul>
      {data.items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value.name} />
      ))}
    </ul>
  );
});

export const DragTable = (props:DragTableProps) => {
  const [dataSource, setDataSource] = React.useState(data);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const onSortEnd = ({oldIndex, newIndex}) => {
    setDataSource({
      items: arrayMove(dataSource.items, oldIndex, newIndex),
    })
  }

  return (
   <SortableList data={dataSource} onSortEnd={onSortEnd}>
   </SortableList>
    )
}
