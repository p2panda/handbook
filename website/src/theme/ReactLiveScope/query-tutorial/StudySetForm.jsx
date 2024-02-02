import React, { useState, useContext, useEffect, useCallback } from 'react';
import { OperationFields } from 'shirokuma';
import { gql } from 'graphql-request';

import { P2pandaContext } from '../P2pandaContext';
import { MessageContext } from '../MessageContext';
import {
  STUDY_SET_MEMBERS_SCHEMA_ID,
  STUDY_SETS_SCHEMA_ID,
  VOCAB_SCHEMA_ID,
} from '../consts';

export const StudySetForm = ({ studySetsQuery, vocabularyQuery }) => {
  const { graphQLClient, session } = useContext(P2pandaContext);
  const { setError, setSuccess } = useContext(MessageContext);

  const [studySets, setStudySets] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
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

  useEffect(() => {
    if (!vocabularyQuery) {
      return;
    }

    const getVocabulary = async () => {
      try {
        const result = await graphQLClient.request(gql`
          ${vocabularyQuery}
        `);
        setVocabulary(
          Array.from(result[`all_${VOCAB_SCHEMA_ID}`]['documents']),
        );
      } catch (err) {
        setError(`${err}`);
      }
    };
    getVocabulary();
  }, [graphQLClient, setVocabulary, setError, vocabularyQuery]);

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

      let documentId = await session.create(fields, {
        schemaId: STUDY_SET_MEMBERS_SCHEMA_ID,
      });

      setSuccess(`Created study set item: ${documentId}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form
      studySets={studySets}
      vocabulary={vocabulary}
      onAddVocabulary={onSubmit}
      busy={busy}
    ></Form>
  );
};

const Form = ({ studySets, vocabulary, onAddVocabulary, busy }) => {
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

  const renderVocabularyItems = () => {
    if (!vocabulary) {
      return (
        <option key={0} value={''}>
          {'no data'}
        </option>
      );
    }
    return vocabulary.map((item) => {
      const id = item['meta']['documentId'];
      const { word, meaning } = item['fields'];
      return (
        <option key={id} value={id}>
          {word}: {meaning}
        </option>
      );
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onAddVocabulary(values['vocabulary'], values['studySet']);
  };

  const disabled = !values.studySet || !values.vocabulary || busy;

  return (
    <div className="study-set-items-form">
      <h2>Add Study Set Item</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="studySet">Study Set Id</label>
          <select
            type="text"
            id="studySet"
            name="studySet"
            size={5}
            onChange={onChange}
          >
            {renderStudySetItems()}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="vocabulary">Study Set Id</label>
          <select
            type="text"
            id="vocabulary"
            name="vocabulary"
            size={10}
            onChange={onChange}
          >
            {renderVocabularyItems()}
          </select>
        </fieldset>
        <input type="submit" value="Add" disabled={disabled} />
      </form>
    </div>
  );
};
