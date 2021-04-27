import React, { useState } from 'react'
import { Row, Col, Layout, Menu, Affix, Input } from 'antd'
import { ReadOutlined, HomeOutlined, GroupOutlined, PartitionOutlined } from '@ant-design/icons'
import Head from 'next/head'
import Link from 'next/link'

import { getAllCategory, getAllPublisher } from '../lib/article'
import MenuItem from 'antd/lib/menu/MenuItem'
import { AppProvider } from '../contexts/appContext'

const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;
class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { categories: [], publishers: [] } }
  }

  componentDidMount() {
    getAllCategory().then(value => {
      let datas = {
        ...this.state.data
      };
      datas.categories = value;
      datas.publishers = datas.publishers;
      this.setState({
        data: datas
      });
    }).catch(err => {
      console.error(err);
    });
    getAllPublisher().then(value => {
      let datas = {
        ...this.state.data
      };
      datas.categories = datas.categories;
      datas.publishers = value;
      this.setState({
        data: datas
      });
    }).catch(err => {
      console.error(err);
    });

  }
  componentWillUnmount() {

  }

  render() {
    let publisher = Array.from(this.state.data.publishers).map((o, i) => {
      return <Menu.Item key={i}><Link href={`/publisher/${o}`}>{o}</Link></Menu.Item>;
    });
    let category = Array.from(this.state.data.categories).map((o, i) => {
      return <Menu.Item key={i}><Link href={`/category/${o}`}>{o}</Link></Menu.Item>;
    });
    return (
      <Layout>
        <AppProvider value={this.state.data}>
          <Head>
            <title>{this.props.title}</title>
          </Head>
          <Affix offsetTop={0}>
            <Header>
              <Row>
                <Col span={8}>
                  <Menu theme='dark' mode='horizontal'>
                    <Menu.Item key='Home' icon={<HomeOutlined />} title='Trang chủ'>
                      <Link href='/'>Trang chủ</Link>
                    </Menu.Item>
                    <Menu.Item key='Cluster' icon={<GroupOutlined />} title='Chủ đề mới nhất'>
                      <Link href='/cluster'>Chủ đề mới nhất</Link>
                    </Menu.Item>
                    <SubMenu key='Publisher' icon={<ReadOutlined />} title='Nhà phát hành'>
                      {publisher}
                    </SubMenu>
                    <SubMenu key='Category' icon={<PartitionOutlined />} title='Thể loại'>
                      {category}
                    </SubMenu>
                  </Menu>
                </Col>
              </Row>
            </Header>
          </Affix>
        </AppProvider>
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