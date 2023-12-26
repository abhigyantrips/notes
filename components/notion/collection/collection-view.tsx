import { CollectionViewProps } from 'react-notion-x';

import * as React from 'react';

import { CollectionViewGallery } from './collection-view-gallery';

export const CollectionViewImpl: React.FC<CollectionViewProps> = (props) => {
  const { collectionView } = props;

  switch (collectionView.type) {
    case 'gallery':
      return <CollectionViewGallery {...props} />;

    default:
      console.warn('unsupported collection view', collectionView);
      return null;
  }
};

export const CollectionView = React.memo(CollectionViewImpl);
