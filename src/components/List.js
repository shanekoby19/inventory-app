import Item from './Item';

const List = ({ list, btnName, customPath }) => {
    return (
        <ul>
            {
                list.length > 0 && list.map((item) => (
                    <Item 
                        key={item._id} 
                        data={item} 
                        btnName={btnName}
                        customPath={customPath} 
                    />
                ))
            }
        </ul>
    )
}

export default List;