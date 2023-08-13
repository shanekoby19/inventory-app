import Item from './Item';

const List = ({ list }) => {
    return (
        <ul>
            {
                list.map((item) => <Item key={item._id} data={item} />)
            }
        </ul>
    )
}

export default List;