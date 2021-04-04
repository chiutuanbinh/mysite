
import { Card, Col, Layout, Menu, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { ClusterMin } from '../components/cluster';
import PageLayout from '../components/layout';
import { PriceTag } from '../components/price';
import { getAllCategory, getAllPublisher, getArticle, getCluster } from '../lib/article';
import { getPrice } from '../lib/price';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Cluster extends React.Component {
  constructor(props) {
    super(props);
    const placeHolder = new Array(5).fill(0).map((v,i) => {
      return {
        'id': i,
        'member':new Array(3)
      }
    })
    this.state = {
      prices: [],
      clusters: placeHolder
    }
  }

  componentDidMount() {
    getCluster(5).then((clusterList) => {
      Array.from(clusterList).map((cluster) => {
        return {
          'cid' : cluster['cid'],
          'member' : cluster['member']
        }
      }).map( (cluster, index) => {    
        const id = cluster['cid'];
        const members = Array.from(cluster['member']).slice(0, 3);
        members.map(x => {
          return [x, index, id];
        }).map((m,i) => {
          getArticle(m[0]).then(v => {
            let currentClusters = this.state.clusters;
            currentClusters[m[1]]['id'] = m[2];
            currentClusters[m[1]]['member'][i] = v;
            this.setState(currentClusters);
            

          })
        })
      })
    }).catch(err => {
      console.error(err);
    })
  }

  render() {
    const clusterList = Array.from(this.state.clusters).map((o,i) => {
      let pr = {
        index: `cluster_${i}`,
        articles: o.member
      }
      return (
        <ClusterMin props={pr}></ClusterMin>
      )
    });



    return (
      <PageLayout title="STH">
        <Content style={{ padding: '0 50px' }}>
          <Row gutter={24}>
            <Col span={16}>
              <Card title='Chủ đề mới nhất'>
                {clusterList}
              </Card>
            </Col>
            <Col span={8}>
              <Card title='Thông tin thị trường'>
                {Array.from(this.state.prices).map((o, i) => {
                  let pr = {
                    index: `price_${i}`,
                    article: o
                  };
                  return (
                    <PriceTag props={pr}></PriceTag>
                  );
                })}
              </Card>
            </Col>
          </Row>
        </Content>
      </PageLayout>

    );
  }
}


// export async function getStaticProps(ctx) {
//   let clusters = await getCluster(5);
//   clusters = clusters.map((o) => {
//     // console.log(o['member'])
//     const size = Math.min(o['member'].length, 10);
//     return { 'id': o['cid'], 'member': o['member'].splice(0, size) };
//   });
//   let datas = [];
//   let i;
//   for (i = 0; i < clusters.length; i++) {
//     let c = clusters[i];
//     const articleData = await Promise.all(c.member.map(x => getArticle(x)));
//     datas.push({ 'id': c.id, 'member': articleData });
//   }

//   return {
//     props: {
//       clusters: datas,
//     }
//   };
// }

export default Cluster;