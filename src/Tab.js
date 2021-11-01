import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs, Button } from 'antd';

const { TabPane } = Tabs;

function Tab(props) {
  const [newTabIndex, setNewTabIndex] = useState<number>(0);
  
  const tabAry = [
    { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
  ];
  const [panes, setPanes] = useState(tabAry);
  const [activeKey, setActiveKey] = useState(panes[0]?.key);

  const onChange = (actKey) => {
    setActiveKey(actKey);
  };

  const onEdit = (targetKey, action) => {
    remove(targetKey);
  };

  const add = () => {

    const actKey = `newTab${newTabIndex + 1}`;
    setNewTabIndex(newTabIndex + 1);
    panes.push({ title: "New Tab", content: "New Tab Pane", key: actKey });
    setActiveKey(actKey);
    setPanes(panes);    
  };

  const remove = (targetKey) => {

    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const newpanes = panes.filter(pane => pane.key !== targetKey);
    if (newpanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        setActiveKey(newpanes[lastIndex].key);
      } else {
        setActiveKey(newpanes[0].key);
      }
    }
    setPanes(newpanes);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
