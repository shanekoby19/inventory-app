import Item from './Item';

const List = ({ list, resource }) => {
    return (
        <div>
            <h2 className='secondary__heading'>{resource}</h2>
            <ul>
                {
                    list.length > 0 && list.map((item) => (
                        <Item 
                            key={item._id} 
                            data={item} 
                            resource={resource} 
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default List;