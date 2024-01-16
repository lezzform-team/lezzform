import React from 'react';

import {Grid} from '../../components/ui/grid';

const TwoColumn = ({children}: React.PropsWithChildren) => {
  return (
    <Grid columns={2} gap={8}>
      {children}
    </Grid>
  );
};
TwoColumn.displayName = 'TwoColumn';

export {TwoColumn};
