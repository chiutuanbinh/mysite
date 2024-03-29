import { Col, Card, Row, Layout } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { ArticleMin } from '../../components/article';
import PageLayout from '../../components/layout'
import { getAllCategory, getAllPublisher, getPublisherLatest } from '../../lib/article';

const { Content } = Layout;

class PublisherHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publisherName: this.props.publisherName,
            articles: new Array(0),
        }
    }
    componentDidMount() {
        getPublisherLatest(this.props.publisherName, 10).then((value) => {
            this.setState({
                articles: value,
                publisherName: this.props.publisherName
            });;
        }).catch(err => {
            console.error(err);
        });
    }
    componentDidUpdate() {
        if (this.state.publisherName != this.props.publisherName) {
            getPublisherLatest(this.props.publisherName, 10).then((value) => {
                this.setState({
                    publisherName: this.props.publisherName,
                    articles: value
                });
            }).catch(err => {
                console.error(err);
            });
        }
    }
    render() {

        const publisherLatest = Array.from(this.state.articles).map((o, i) => {
            o.publisher = this.state.publisherName;
            let pr = {
                index: `a_${i}`,
                article: o
            };
            console.log(i);
            return (
                <ArticleMin props={pr}></ArticleMin>
            );
        });
        return (
            <PageLayout title="STM">
                <Content style={{ padding: '0 50px' }}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card title='Tin tức mới nhất'>
                                {publisherLatest}
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </PageLayout>
        );
    };
}

export async function getStaticPaths() {
    let publisherList = await getAllPublisher();
    const paths = publisherList.map((o, i) => {
        return {
            params: {
                publisher: o
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const publisherName = params.publisher;
    return {
        props: {
            publisherName: publisherName,
        }
    };
}

export default PublisherHomePage;