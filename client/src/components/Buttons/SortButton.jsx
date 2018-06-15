import React from 'react';
import { Dropdown } from 'semantic-ui-react';


const SortButton = ({sortList, onSort}) => (
  <div className='sortButton'>
    <Dropdown text='Sort' icon='sort' labeled button className='icon'>
      <Dropdown.Menu>
        {sortList.map((item, i) => (
          <Dropdown.Item key = {i} onClick = {(e)=> {onSort(item.sortBy);}}>
            {item.label}
          </Dropdown.Item>
          )
        )}
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

export default SortButton;
