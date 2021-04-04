import React, { ReactNode } from 'react';
import 'antd/dist/antd.css';
import { Card, Layout, Row, Col } from 'antd';
import PageLayout from '../../components/layout';
import { ArticleMin } from '../../components/article';
import { getAllCategory, getCategoryLatest } from '../../lib/article';

const { Content } = Layout;
interface CategoryProps {
    categoryName: string,

}
interface CategoryStates {
    categoryName: string,
    articles: any[]

}



export default class CategoryHomePage extends React.Component<CategoryProps, CategoryStates> {

    /**
     *
     */
    constructor(props: CategoryProps) {
        super(props);
        this.state = {
            categoryName: props.categoryName,
            articles: new Array(0)
        }
    }
    componentDidMount() {
        getCategoryLatest(this.props.categoryName, 10).then((value: any[]) => {
            this.setState({
                articles: value,
                categoryName: this.props.categoryName
            });
        }).catch(err => {
            console.error(err);
        })
    }

    componentDidUpdate() {
        if (this.state.categoryName != this.props.categoryName) {
            getCategoryLatest(this.props.categoryName, 10).then((value: any[]) => {
                this.setState({
                    categoryName: this.props.categoryName,
                    articles: value
                });;
            }).catch(err => {
                console.error(err);
            });
        }
    }
    render() {
        const categoryLatest = Array.from(this.state.articles).map((o, i) => {
            o.category = this.state.categoryName;
            let pr = {
                index: `a_${i}`,
                article: o
            };
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
                                {categoryLatest}
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </PageLayout>
        );
    }
}

export async function getStaticPaths() {
    let categoryList: string[] = await getAllCategory();
    const paths = categoryList.map((o, i) => {
        return {
            params: {
                category: o
            }
        };
    });
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const categoryName = params.category;
    return {
        props: {
            categoryName: categoryName,
        }
    }
}