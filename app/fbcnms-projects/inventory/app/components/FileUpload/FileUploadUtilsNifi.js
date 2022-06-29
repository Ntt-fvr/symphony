/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import axios from 'axios';
import AddFilesNifi from '../../mutations/AddFilesNifi';


export async function uploadFileNifi(
  id: string,
  file: File
) {
  const signingResponse = await axios.get(
    '/store/putNifi',
    {
      params: {
        contentType: file.type,
        nameFile: file.name
      },
    },
  );

  const config = {
    headers: {
      'Content-Type': file.type,
    },
  };
  console.log(signingResponse.data.URL);
  await axios.put(signingResponse.data.URL, file, config);
  console.log(signingResponse.data.key);

  const onDocumentUploaded = (files, key) => {
    const workOrderId = '433791696897';
    console.log(files);
    const variables: AddImageMutationVariables = {
      input: {
        imgKey: key,
        fileName: file.name,
        fileSize: file.size,
        modified: '2006-01-02T15:04:05Z',
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
        return true
      },
      onError: () => {
        return false
      },
    };

    AddFilesNifi(variables, callbacks, updater);
  };

  onDocumentUploaded(file, 'gdsdsd');
}
