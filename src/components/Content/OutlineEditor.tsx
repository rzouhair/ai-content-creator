import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

function OutlineEditor({ outline, setOutline, done }: { outline: any, setOutline: any, done: any }) {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleTextChange = (index: number, text: string) => {
    const newOutline = [...outline];
    newOutline[index].name = text;
    setOutline(newOutline);
  };

  const handleChildTextChange = (
    parentIndex: number,
    childIndex: number,
    text: string
  ) => {
    const newOutline = [...outline];
    if (newOutline[parentIndex].children) {
      newOutline[parentIndex].children![childIndex].name = text;
      setOutline(newOutline);
    }
  };

  const addH2 = () => {
    if (selectedItem) {
      const newOutline = [...outline];
      newOutline.splice(selectedItem + 1, 0, {
        name: 'New H2',
        type: 'normal',
        children: [],
      });
      setOutline(newOutline);
      setSelectedItem(null)
      return
    } 
    setOutline([
      ...outline,
      {
        name: 'New H2',
        type: 'normal',
        children: [],
      },
    ]);
  };

  const addH3 = () => {
    if (selectedItem) {
      const newOutline = outline.map((item) => {
        if (item === outline[selectedItem]) {
          return {
            ...item,
            children: [...(item.children || []), { type: 'normal', name: 'New H3' }],
          };
        }
        return item;
      });
      console.log({
        newOutline
      })
      setOutline(newOutline);
    }
  };

  const removeChild = (parentIndex: number, childIndex: number) => {
    if (!childIndex && childIndex !== 0) {
      setSelectedItem(null);
      const newOutline = outline.filter((item) => item !== outline[parentIndex]);
      setOutline(newOutline);
      return;
    }
    const newOutline = [...outline];
    if (newOutline[parentIndex].children) {
      newOutline[parentIndex].children!.splice(childIndex, 1);
      setOutline(newOutline);
    }
  };

  const selectItem = (item: any) => {
    setSelectedItem(item);
  };
  return (
    <div>
      <ul className='flex flex-col gap-2'>
        {outline.map((item, index) => (
          <li key={index}>
            <div className={`flex items-center gap-2 ${item.children?.length ? 'mb-2' : ''}`}>
              <span className='font-semibold'>H2</span>
              <Input
                type="text"
                value={item.name}
                onChange={(e) => handleTextChange(index, e.target.value)}
                onClick={() => selectItem(index)}
              />
              <div>
                <Button className='px-0 w-10 h-10' variant="ghost" onClick={() => removeChild(index, null)}>
                  <Trash className='w-4 h-4 text-red-500' />
                </Button>
              </div>
            </div>
            <ul className='ml-6 flex flex-col gap-2'>
              {item.children?.map((child, childIndex) => (
                <li key={childIndex} className='flex items-center gap-2'>
                  <span className='font-semibold'>H3</span>
                  <Input
                    type="text"
                    value={child.name}
                    onChange={(e) =>
                      handleChildTextChange(index, childIndex, e.target.value)
                    }
                  />
                  <div>
                    <Button className='px-0 w-10 h-10' variant="ghost" onClick={() => removeChild(index, childIndex)}>
                      <Trash className='w-4 h-4 text-red-500' />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className='flex items-center gap-2 mt-4'>
        <Button onClick={addH2}>Add H2 {selectedItem && 'after Selected'}</Button>
        <Button onClick={addH3} disabled={!selectedItem}>
          Add H3 to Selected
        </Button>
        <Button onClick={done} variant='secondary'>
          Done
        </Button>
      </div>
    </div>
  )
}

export default OutlineEditor