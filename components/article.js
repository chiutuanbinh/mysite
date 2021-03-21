import { Card, Collapse } from 'antd'
import Meta from 'antd/lib/card/Meta';
const { Panel } = Collapse;

function toEllapse(timestamp) {
    const elapse = Date.now() - timestamp;
    let elapseString;
    const dayMillis = 3600000 * 24;
    const monthMillis = dayMillis * 30;
    const yearMilis = dayMillis * 365;
    if (elapse > yearMilis) {
        elapseString = `${Math.floor(elapse / yearMilis)} năm truớc`;
    } else if (elapse > monthMillis) {
        elapseString = `${Math.floor(elapse / monthMillis)} tháng truớc`;
    } else if (elapse > dayMillis) {
        elapseString = `${Math.floor(elapse / dayMillis)} ngày trước`;
    } else if (elapse > 3600000) {
        elapseString = `${Math.floor(elapse / 3600000)} giờ trước`;
    } else {
        elapseString = `${Math.floor(elapse / 60000)} phút trước`;
    }
    return elapseString;
}

function ArticleMin({ props }) {
    const elapseString = toEllapse(props.article.timestamp);
    return (
        <Card hoverable key={props.index}>
            <Meta title={props.article.title} description={`${props.article.publisher} ${elapseString}`}></Meta>
            <p>{props.article.description}</p>
        </Card>


    )
}

export { ArticleMin }