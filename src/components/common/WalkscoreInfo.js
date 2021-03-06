import React from 'react';

import { Modal, Button } from 'antd';

export default function WalkscoreInfo(props) {
  function showModal() {
    props.setWalk({
      ...props.walk,
      visible: true,
    });
  }

  function handleOk(e) {
    e.preventDefault();
    props.setWalk({
      ...props.walk,
      visible: false,
    });
  }

  return (
    <>
      <Button className="walkscore-btn" type="primary" onClick={showModal}>
        ?
      </Button>
      <Modal
        title="Walkscore Info"
        visible={props.walk.visible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <h2>90-100: Walker's Paradise</h2>
        <p>Daily errands do not require a car.</p>
        <h2>70-89: Very Walkable</h2>
        <p>Most errands can be accomplished on foot.</p>
        <h2>50-69: Somewhat Walkable</h2>
        <p>Some errands can be accomplished on foot.</p>
        <h2>25-49: Car-Dependent</h2>
        <p>Most errands require a car.</p>
        <h2>0-24: Car-Dependent</h2>
        <p>Almost all errands require a car.</p>
        <p className="walkscore-source">
          <a
            href="https://www.walkscore.com/methodology.shtml"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </p>
      </Modal>
    </>
  );
}
