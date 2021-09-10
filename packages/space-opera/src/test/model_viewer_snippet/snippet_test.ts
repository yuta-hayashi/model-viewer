/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {ModelViewerPreview} from '../../components/model_viewer_preview/model_viewer_preview';
import {dispatchGltfUrl} from '../../components/model_viewer_preview/reducer';
import {ExportPanel} from '../../components/model_viewer_snippet/model_viewer_snippet';
import {dispatchReset} from '../../reducers';
import {reduxStore} from '../../space_opera_base';

const CUBE_GLTF_PATH = '../base/shared-assets/models/textureCubes.gltf';

fdescribe('snippet test', () => {
  let preview: ModelViewerPreview;
  let exportPanel: ExportPanel;

  beforeEach(async () => {
    reduxStore.dispatch(dispatchReset());
    preview = new ModelViewerPreview();
    document.body.appendChild(preview);
    await preview.updateComplete;

    exportPanel = new ExportPanel();
    document.body.appendChild(exportPanel);

    reduxStore.dispatch(dispatchGltfUrl(CUBE_GLTF_PATH));
    await preview.loadComplete;
    await exportPanel.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(exportPanel);
    document.body.removeChild(preview);
  });

  it('exports correct snippet', () => {
    const exportedSnippet = exportPanel.snippetViewer.getText();
    expect(exportedSnippet).toContain('camera-controls');
    expect(exportPanel.exportZipButton.snippetText).toEqual(exportedSnippet);
  });
});
