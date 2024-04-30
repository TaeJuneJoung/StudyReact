import {ChangeEvent, DragEvent} from 'react'

import classes from './FileInputComponent.module.css'

export default function FileInputComponent() {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File | null = files.item(i)
        console.log(file)
      }
    }
  }

  const dragOverHandler = (e: DragEvent) => e.preventDefault()

  const dropHandler = (e: DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer?.files

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File | null = files.item(i)
        console.log(file)
      }
    }
  }

  return (
    <>
      <h2 draggable>File</h2>
      <div
        className={classes.fileDropBox}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}>
        BOX
      </div>
      <input type="file" onChange={changeHandler} multiple accept="image/*" />
    </>
  )
}
