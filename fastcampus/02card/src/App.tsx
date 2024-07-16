import { useAlertContext } from '@contexts/AlertContext'

import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import Alert from '@shared/Alert'

function App() {
  const { open } = useAlertContext()

  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2" color="blue">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>

      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>

      <Button>클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success" weak={true}>
        클릭해주세요
      </Button>
      <Button color="error" weak={true}>
        클릭해주세요
      </Button>
      <Button full={true}>클릭해주세요</Button>
      <Button full={true} disabled={true}>
        클릭해주세요
      </Button>

      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>

      <Input placeholder="로그인" aria-invalid={false} />
      <Input />

      <TextField label="아이디" />
      <TextField label="패스워드" />

      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>

      {/* <Alert
        open
        title="알림이 있습니다."
        description="안녕하세요"
        onButtonClick={() => {}}
      /> */}

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인해주세요',
            onButtonClick: () => {
              //
            },
          })
        }}
      >
        Alert오픈
      </Button>
    </div>
  )
}

export default App
