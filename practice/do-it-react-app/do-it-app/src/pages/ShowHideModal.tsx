import {useCallback} from 'react'

import {useToggle} from '../hooks'
import {Subtitle, Title} from '../components'
import {Button} from '../theme/daisyui'
import {Modal, ModalAction, ModalContent} from '../theme/daisyui/Modal'

import * as D from '../data'

export default function ShowHideModal() {
  const [open, toggleOpen] = useToggle(false)
  const onAccept = useCallback(() => {
    toggleOpen()
  }, [toggleOpen])

  return (
    <section className="mt-4">
      <Title>ShowHideModal</Title>
      <div className="flex justify-center p-4">
        <Button className="btn-primary" onClick={toggleOpen}>
          open modal
        </Button>
      </div>
      <Modal open={open}>
        <ModalContent
          closeIconClassName="btn-primary btn-outline"
          onCloseIconClicked={toggleOpen}>
          <Subtitle>Modal</Subtitle>
          <p>{D.randomParagraphs()}</p>
          <ModalAction>
            <Button className="btn-primary" onClick={onAccept}>
              Accept
            </Button>
            <Button onClick={toggleOpen}>Close</Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </section>
  )
}
