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

export async function uploadFileNifi(
  id: string,
  file: File,
  //onUpload: (File, string) => void
) {
  const signingResponse = await axios.get('/store/putNifi' + '?contentType=text/csv', {
    params: {
      contentType: file.type
    },
  });

  const config = {
    headers: {
      'Content-Type': file.type,
    },
  };
  console.log(signingResponse.data.URL)
  await axios.put(signingResponse.data.URL, file, config);
  console.log(signingResponse.data.key)

//   onUpload(file, signingResponse.data.key);
}
