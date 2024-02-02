import React, { useState, useContext, useEffect, useCallback } from 'react';
import { OperationFields } from 'shirokuma';
import { gql } from 'graphql-request';

import { P2pandaContext } from '../P2pandaContext';
import { MessageContext } from '../MessageContext';
import { STUDY_SET_MEMBERS_SCHEMA_ID, STUDY_SETS_SCHEMA_ID } from '../consts';

export const StudySetForm = ({ studySetsQuery }) => {
  const { graphQLClient, session } = useContext(P2pandaContext);
  const { setError, setSuccess } = useContext(MessageContext);

  const [studySets, setStudySets] = useState([]);
  const [busy, setBusy] = useState([]);

  const getStudySets = useCallback(async () => {
    try {
      setBusy(true);
      const result = await graphQLClient.request(gql`
        ${studySetsQuery}
      `);
      const set = Array.from(
        result[`all_${STUDY_SETS_SCHEMA_ID}`]['documents'],
      );
      setStudySets(set);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setBusy(false);
    }
  }, [graphQLClient, setError, studySetsQuery]);

  useEffect(() => {
    if (!studySetsQuery) {
      return;
    }
    getStudySets();
  }, [graphQLClient, setStudySets, setError, studySetsQuery, getStudySets]);

  const onSubmit = async (vocabularyId, studySetDocumentId) => {
    setError(null);
    setSuccess(null);

    try {
      setBusy(true);
      const timestamp = Number(new Date().getTime());
      const fields = new OperationFields({
        date_added: timestamp,
        last_studied: timestamp,
      });
      fields.insert('member', 'relation', vocabularyId);
      fields.insert('study_set', 'relation', studySetDocumentId);
      fields.insert('rating', 'float', 0.0);

      await session.create(fields, {
        schemaId: STUDY_SET_MEMBERS_SCHEMA_ID,
      });

      setSuccess(`Added vocabulary to study set: ${studySetDocumentId}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form studySets={studySets} onAddVocabulary={onSubmit} busy={busy}></Form>
  );
};

const Form = ({ studySets, onAddVocabulary, busy }) => {
  const [values, setValues] = useState({
    studySet: '',
    vocabulary: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((oldValues) => {
      return {
        ...oldValues,
        [name]: value,
      };
    });
  };

  const renderStudySetItems = () => {
    if (!studySets) {
      return (
        <option key={0} value={''}>
          {'no data'}
        </option>
      );
    }
    return studySets.map((item) => {
      const id = item['meta']['documentId'];
      const title = item['fields']['title'];
      return (
        <option key={id} value={id}>
          {title}
        </option>
      );
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onAddVocabulary(values['vocabulary'], values['studySet']);
    setValues({ studySet: '', vocabulary: '' });
  };

  const disabled = !values.studySet || !values.vocabulary || busy;

  return (
    <div className="study-set-items-form">
      <h2>Add vocabulary to a study set</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="studySet">Study Sets</label>
          <select
            id="studySet"
            name="studySet"
            size={3}
            value={values['studySet']}
            onChange={onChange}
          >
            {renderStudySetItems()}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="vocabulary">Vocabulary ID</label>
          <input
            type="text"
            id="vocabulary"
            name="vocabulary"
            value={values['vocabulary']}
            onChange={onChange}
          />
        </fieldset>
        <input type="submit" value="Add" disabled={disabled} />
      </form>
    </div>
  );
};
