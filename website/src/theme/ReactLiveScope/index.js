import React, { useMemo, useState, useContext } from 'react';
import { KeyPair, Session, initWebAssembly } from 'shirokuma';

export const AddIcecream = () => {
  const [values, setValues] = useState({
    title: '',
    latin: '',
    edible: false,
    description: '',
    schemaId: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((oldValues) => {
      return {
        ...oldValues,
        [name]: name === 'edible' ? !oldValues.edible : value,
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await initWebAssembly();
    const keyPair = new KeyPair();
    const session = new Session('http://localhost:2020/graphql').setKeyPair(keyPair);
    await session.create({'name': 'hello'}, {'schemaId': values.schemaId});
  };

  const disabled = !values.description | !values.description;

  return (
    <>
      <h2>Add Mushroom</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
            <label htmlFor="schemaId">Schema Id</label>
            <textarea
                id="latin"
                name="schemaId"
                value={values.schemaId}
                onChange={onChange}
            />
            </fieldset>
            <fieldset>
            <label htmlFor="description">Description</label>
            <textarea
                id="latin"
                name="description"
                value={values.description}
                onChange={onChange}
            />
            </fieldset>
        <input type="submit" value="Add" disabled={disabled} />
      </form>
    </>
  );
};

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    AddIcecream,
  };
  
export default ReactLiveScope;
  
  