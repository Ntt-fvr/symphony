/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

jest.mock('../../common/RelayEnvironment');

import 'jest-dom/extend-expect';
import React from 'react';

import {SimpleChangeRequest} from '../../components/resource_instance/SimpleChangeRequest';

import {fireEvent, render} from '@testing-library/react';
import {within} from '@testing-library/dom';

const cmVersion = {
  id: 'test-cmVersion',
  resource: {
    id: '0x2713',
  },
  status: 'CURRENT',
  parameters: [
    {
      stringValue: '1234',
      parameterType: {
        name: 'Param 1',
        id: '0x2711',
        index: 0,
        resourceSpecification: '296352743426',
        mappingIn: null,
        mappingOut: null,
        stringValue: '1234',
        booleanValue: false,
        category: null,
        externalId: null,
        floatValue: null,
        intValue: null,
        isDeleted: null,
        isEditable: true,
        isListable: null,
        isMandatory: null,
        isPrioritary: false,
        latitudeValue: null,
        longitudeValue: null,
        nodeType: null,
        rangeFromValue: null,
        rangeToValue: null,
        rawValue: null,
        tags: [],
        type: 'string',
      },
    },
    {
      stringValue: '34567',
      parameterType: {
        name: 'Param 2',
        id: '0x2712',
        index: 1,
        resourceSpecification: '296352743426',
        mappingIn: null,
        mappingOut: null,
        stringValue: '34567',
        booleanValue: false,
        category: null,
        externalId: null,
        floatValue: null,
        intValue: null,
        isDeleted: null,
        isEditable: true,
        isListable: null,
        isMandatory: null,
        isPrioritary: false,
        latitudeValue: null,
        longitudeValue: null,
        nodeType: null,
        rangeFromValue: null,
        rangeToValue: null,
        rawValue: null,
        tags: [],
        type: 'string',
      },
    },
    {
      stringValue: 'b',
      parameterType: {
        name: 'Param 3',
        id: '0x7531',
        index: 2,
        resourceSpecification: '296352743426',
        mappingIn: null,
        mappingOut: null,
        stringValue: '["a","b"]',
        booleanValue: false,
        category: null,
        externalId: null,
        floatValue: null,
        intValue: null,
        isDeleted: null,
        isEditable: true,
        isListable: null,
        isMandatory: null,
        isPrioritary: false,
        latitudeValue: null,
        longitudeValue: null,
        nodeType: null,
        type: 'enum',
        rangeFromValue: null,
        rangeToValue: null,
        rawValue: null,
        tags: [],
      },
    },
    {
      floatValue: 19.29,
      parameterType: {
        name: 'Param 4',
        id: '0x7532',
        index: 3,
        resourceSpecification: '296352743426',
        mappingIn: null,
        mappingOut: null,
        stringValue: null,
        booleanValue: false,
        category: null,
        externalId: null,
        floatValue: 19.29,
        intValue: null,
        isDeleted: null,
        isEditable: true,
        isListable: null,
        isMandatory: null,
        isPrioritary: false,
        latitudeValue: null,
        longitudeValue: null,
        nodeType: null,
        type: 'float',
        rangeFromValue: null,
        rangeToValue: null,
        rawValue: null,
        tags: [],
      },
    },
    {
      intValue: 100,
      parameterType: {
        name: 'Param 5',
        id: '0x7533',
        index: 4,
        resourceSpecification: '296352743426',
        mappingIn: null,
        mappingOut: null,
        stringValue: null,
        booleanValue: false,
        category: null,
        externalId: null,
        floatValue: null,
        intValue: 100,
        isDeleted: null,
        isEditable: true,
        isListable: null,
        isMandatory: null,
        isPrioritary: false,
        latitudeValue: null,
        longitudeValue: null,
        nodeType: null,
        type: 'int',
        rangeFromValue: null,
        rangeToValue: null,
        rawValue: null,
        tags: [],
      },
    },
  ],
};
const resource = {
  id: '0x2713',
};

let container;

beforeEach(() => {
  container = render(
    <SimpleChangeRequest cmVersion={cmVersion} resource={resource} />,
  );
});

describe('Test <SimpleChangeRequest /> Behavior', () => {
  describe('Required sub components validation', () => {
    it('Should show submit Button', () => {
      const buttonSubmit = container.getByTestId('btn-submit');
      expect(buttonSubmit).toBeDefined();
    });

    it('Should show CardPlusDnD', () => {
      const CardPlusDnD = container.getByTestId('card-plus-dnd');
      expect(CardPlusDnD).toBeDefined();
    });

    it('Should show CardSuggested', () => {
      const CardSuggested = container.getByTestId('card-suggested');
      expect(CardSuggested).toBeDefined();
    });
  });

  describe('<CardPlusDnD /> Behavior', () => {
    let CardPlusDnD;
    beforeEach(() => {
      CardPlusDnD = container.getByTestId('card-plus-dnd');
    });
    it('Should be visible', () => {
      expect(CardPlusDnD).toBeDefined();
    });

    it('Should show the parameters table empty', () => {
      const tBody = within(CardPlusDnD).queryAllByRole('rowgroup')[1];
      expect(within(tBody).queryAllByRole('row').length).toEqual(0);
    });

    it('Should add one change parameter to table', () => {
      const AddParameterButton = within(CardPlusDnD).getByTestId(
        'add-parameter',
      );
      fireEvent.click(AddParameterButton);

      const tBody = within(CardPlusDnD).queryAllByRole('rowgroup')[1];
      expect(within(tBody).queryAllByRole('row').length).toEqual(1);
    });
  });

  describe('<CardSuggested /> Behavior', () => {
    let CardSuggested;
    beforeEach(() => {
      CardSuggested = container.getByTestId('card-suggested');
    });

    it('Should be visible', () => {
      expect(CardSuggested).toBeDefined();
    });

    it('Should have suggested options', () => {
      const ByApproval = within(CardSuggested).getByText('As soon as approved');
      expect(ByApproval).toBeDefined();

      const BySchedule = within(CardSuggested).getByText(
        'Schedule with approval',
      );
      expect(BySchedule).toBeDefined();
    });
  });
});
