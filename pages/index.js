import Head from 'next/head'
import { Calendar, Card, Col, Layout,  Row, Image } from 'antd'
import 'antd/dist/antd.css'
const { Header, Footer, Sider, Content } = Layout
export default function Home() {
  return (
    <Layout>
      <Header>
        <Image width={50} src='/b.svg'></Image>
      </Header>
      <Layout>
        <Content style={{padding: '0 50px'}}>Content
          <Row gutter={16}>
            <Col span={8}>
              <Card title='calendar'>
                <Calendar fullscreen={false} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title='Tin tức mới nhất'>
                <p>con</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title='Thông tin thị trường'>
                <p>con</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer style={{textAlign:'center'}}>Chiu Tuan Binh 2021 <br></br> Created with ant design</Footer>
    </Layout>
  
    )
}
