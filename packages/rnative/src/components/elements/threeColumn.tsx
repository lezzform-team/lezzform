import React from 'react';

import {Grid} from '../../components/ui/grid';

const ThreeColumn = ({children}: React.PropsWithChildren) => {
  return (
    <Grid columns={3} gap={8}>
      {children}
    </Grid>
  );
};
ThreeColumn.displayName = 'ThreeColumn';

export {ThreeColumn};
