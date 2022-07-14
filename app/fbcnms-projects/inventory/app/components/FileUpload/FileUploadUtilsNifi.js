/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AddFilesNifi from '../../mutations/AddFilesNifi';
import axios from 'axios';
import moment from 'moment';
const DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ssZ';
export async function uploadFileNifi(id: string, file: File) {
  const signingResponse = await axios.get('/store/putNifi', {
    params: {
      contentType: file.type,
      nameFile: file.name,
    },
  });
  const config = {
    headers: {
      'Content-Type': file.type,
    },
  };
  await axios.put(signingResponse.data.URL, file, config);
  const createdTime = moment(new Date()).format(DATE_FORMAT);
  const onDocumentUploaded = (files, key) => {
    const variables: AddImageMutationVariables = {
      input: {
        imgKey: key,
        fileName: `${signingResponse.data.key}-${file.name}`,
        fileSize: file.size,
        modified: createdTime,
        contentType: file.type,
      },
    };
    const updater = store => {
      const newNode = store.getRootField('addImage');
      const workOrderProxy = store.get(workOrderId);
      if (newNode == null || workOrderProxy == null) {
        return;
      }
      const fileType = newNode.getValue('fileType');
      if (fileType === FileTypeEnum.IMAGE) {
        const imageNodes = workOrderProxy.getLinkedRecords('images') || [];
        workOrderProxy.setLinkedRecords([...imageNodes, newNode], 'images');
      } else {
        const fileNodes = workOrderProxy.getLinkedRecords('files') || [];
        workOrderProxy.setLinkedRecords([...fileNodes, newNode], 'files');
      }
    };
    const callbacks: MutationCallbacks<AddImageMutationResponse> = {
      onCompleted: () => {
        return true;
      },
      onError: () => {
        return false;
      },
    };
    AddFilesNifi(variables, callbacks, updater);
  };
  onDocumentUploaded(file, `${signingResponse.data.key}-${file.name}`);
}
