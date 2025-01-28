import React, { useEffect, useState, useCallback } from 'react'
import { useClient } from 'sanity'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { GripVertical } from 'lucide-react'

export function CustomDocumentView(props) {
  console.log('CustomDocumentView props:', props)
  const { displayed } = props.document
  const [childDocuments, setChildDocuments] = useState([])
  const [enabled, setEnabled] = useState(false)
  const client = useClient({ apiVersion: '2021-03-25' })

  const fetchChildDocuments = useCallback(() => {
    if (displayed?._id) {
      const query = `*[
        _type in ["subPage", "otherDocumentType"] && 
        parent._ref == $id &&
        !(_id in path('drafts.**'))
      ] | order(order asc) {
        _id,
        _type,
        title,
        parent,
        order
      }`
      const params = { id: displayed?._id }

      client
        .fetch(query, params)
        .then((results) => {
          console.log('Fetched published child documents:', results)
          setChildDocuments(results)
          setEnabled(true)
        })
        .catch((err) => {
          console.error('Error fetching child documents:', err)
        })
    }
  }, [displayed?._id, client])

  useEffect(() => {
    fetchChildDocuments()
    return () => {
      setEnabled(false)
    }
  }, [fetchChildDocuments])

  const onDragEnd = async (result) => {
    console.log('Drag ended:', result)
    if (!result.destination) {
      return
    }

    const items = Array.from(childDocuments)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setChildDocuments(items)

    // Update order in Sanity
    const transaction = client.transaction()
    items.forEach((item, index) => {
      transaction.patch(item._id, (patch) => patch.set({ order: index }))
    })

    try {
      await transaction.commit()
      console.log('Order updated successfully')

      // Update only the current (parent) document to trigger revalidation
      await client
        .patch(displayed._id)
        .set({ lastOrderUpdate: new Date().toISOString() })
        .commit()

      console.log('Parent document updated for revalidation')
      fetchChildDocuments() // Refresh the list to get the updated order
    } catch (err) {
      console.error('Error updating order:', err)
    }
  }

  const onDragStart = () => {
    console.log('Drag started')
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100)
    }
  }

  if (!displayed) {
    return <div>No document to display</div>
  }

  return (
    <div className="p-4">
      <h3 className="text-[16px] font-medium mb-4">
        Children subpage navigation
      </h3>

      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {enabled && childDocuments.length > 0 ? (
          <Droppable droppableId="list">
            {(provided) => (
              <ul
                className="list-none pl-0"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {childDocuments.map((childDoc, index) => (
                  <Draggable
                    key={childDoc._id}
                    draggableId={childDoc._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`mb-2 p-2 border-gray-300 border-[1px] rounded cursor-move ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                      >
                        <div className={'flex items-center gap-x-[8px]'}>
                          <GripVertical color="gray" size={20} />
                          <span className={'text-[16px]'}>
                            {childDoc.order + 1}. {childDoc.title}
                          </span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        ) : (
          <div className={'text-[16px]'}>
            {enabled ? 'No child pages found.' : 'Loading...'}
          </div>
        )}
      </DragDropContext>
    </div>
  )
}
