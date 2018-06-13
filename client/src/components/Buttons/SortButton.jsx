import React from 'react';
import { Dropdown } from 'semantic-ui-react';


const SortButton = ({sortList, onSort}) => (
  <Dropdown style={{position: 'absolute', top: 0, right: '7em'}} text='Sort' icon='sort' labeled button className='icon'>
    <Dropdown.Menu>
      {sortList.map((item, i) => (
        <Dropdown.Item key = {i} onClick = {(e)=> {onSort(item.sortBy);}}>
          {item.label}
        </Dropdown.Item>
        )
      )}
    </Dropdown.Menu>
  </Dropdown>
);

export default SortButton;
