import React, { useState, useContext } from 'react';

import { P2pandaContext } from '../P2pandaContext';
import { MessageContext } from '../MessageContext';

export const CafeForm = ({ createCafe }) => {
  const { session } = useContext(P2pandaContext);
  const { setError, setSuccess } = useContext(MessageContext);

  const [values, setValues] = useState({
    address: '123 Yummy St.',
    name: 'Ice Cream Heaven',
    opening_year: 2020,
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
    setError(null);
    setSuccess(null);

    let documentId = null;
    try {
      documentId = await createCafe(session, values);
    } catch (e) {
      setError(e.message);
      return;
    }
    // eslint-disable-next-line no-undef
    setSuccess(`Created Cafe: ${documentId}`);
  };

  const disabled = !values.address || !values.name || !values.opening_year;

  return (
    <div className="cafe-form">
      <h2>Create Cafe</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={onChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={values.address}
            onChange={onChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="opening_year">Opening Year</label>
          <input
            type="number"
            id="latin"
            name="opening_year"
            value={values.opening_year}
            onChange={onChange}
          />
        </fieldset>
        <input type="submit" value="Create" disabled={disabled} />
      </form>
    </div>
  );
};
