import React from 'react'
import {Row, Col, Layout, Menu } from 'antd'
import { ReadOutlined, HomeOutlined } from '@ant-design/icons'
import Head from 'next/head'
import Link from 'next/link'

import { getAllPublisher } from '../lib/article'
import MenuItem from 'antd/lib/menu/MenuItem'

const { Header, Footer, Content } = Layout;
const { SubMenu } = Menu;
class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { publishers: [] }
  }

  componentDidMount() {
  }
  componentWillUnmount() {

  }

  render() {
    const publisherList = () => {
      return this.props.publishers.map((o, i) => {
        return <Menu.Item key={i}><Link href={`/publisher/${o}`}>{o}</Link></Menu.Item>
      })
    }
    return (
      <Layout>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <Header>          
            <Menu theme='dark' mode='horizontal'>
              <Menu.Item key='Home' icon={<HomeOutlined />} title='Trang chủ'>
              <Link href='/'>Trang chủ</Link>
              </Menu.Item>
              <SubMenu key='Publisher' icon={<ReadOutlined />} title='Nhà phát hành'>
                {publisherList()}
              </SubMenu>
            </Menu>       

        </Header>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            {this.props.children}
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Chiu Tuan Binh 2021 <br></br> Created with ant design</Footer>
      </Layout>
    );
  }
}

export default PageLayout;