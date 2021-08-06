import * as React from 'react';
import {makeStyles} from '@material-ui/core';
import {useRouter} from '@fbcnms/ui/hooks';
import Text from '@symphony/design-system/components/Text';
import Table from '@symphony/design-system/components/Table/Table';
import withSuspense from '../../../../common/withSuspense';
import {Organization, useOrganizations} from '../data/Organizations';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: symphony.palette.white,
    borderRadius: '4px',
  },
  table: {
    height: '100%',
  },
  field: {
    margin: '2px',
  },
  nameColumn: {
    width: '200%',
  },
}));

type OrganizationTableRow = TableRowDataType<{|data: Organization|}>;

const org2OrganizationTableRow: Organization => OrganizationTableRow = organization => ({
  key: organization.id,
  data: organization,
});

function OrganizationsTable() {
  const {history} = useRouter();
  const classes = useStyles();
  const organizations = useOrganizations();
  const organizationsTableData = React.useMemo(
    () => organizations.map(org2OrganizationTableRow),
    [organizations],
  );

  const handleOnEdit = React.useCallback(orgId => {
    if (orgId != null) {
      history.push(`organization/${orgId}`);
    }
  });

  const handleOnDelete = (orgId) => {
    if (orgId == null) {
      return;
    }
    props
      .confirm(
        <fbt desc="">
          Are you sure you want to delete this organization?
        </fbt>,
      )
      .then(confirm => {
        if (!confirm) {
          return;
        }
        return onClose();
      });
  }

  const columns = React.useMemo(() => {
    const returnCols = [
      {
        key: 'organization',
        title: (
          <fbt desc="Organization column header in organization table">
            Organization
          </fbt>
        ),
        titleClassName: classes.nameColumn,
        className: classes.nameColumn,
        render: orgRow => <Text useEllipsis={true}>{orgRow.data.name}</Text>,
      },
      {
        key: 'description',
        title: (
          <fbt desc="Description column header in organization table">
            Description
          </fbt>
        ),
        render: orgRow => (
          <Text useEllipsis={true}>{orgRow.data.description}</Text>
        ),
      },
      {
        key: 'members',
        title: <fbt desc="Members column header in users table">Members</fbt>,
        render: orgRow => (
          <Text useEllipsis={true}>{orgRow.data.members.length}</Text>
        ),
      },
      {
        key: 'edit',
        title: <fbt desc="Edit column header in organizations table">Edit</fbt>,
        render: orgRow => (
          <IconButton
            color="primary"
            onClick={() => handleOnEdit(orgRow.data.id)}>
            <EditIcon />
          </IconButton>
        ),
      },
      {
        key: 'delete',
        title: (
          <fbt desc="Delete column header in organizations table">Delete</fbt>
        ),
        render: orgRow => (
          <IconButton color="primary" onClick={()=>handleOnDelete(orgRow.data.id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
    return returnCols;
  }, [classes.nameColumn, classes.field]);
  return (
    <div className={classes.root}>
      <Table
        className={classes.table}
        dataRowsSeparator="border"
        data={organizationsTableData}
        columns={columns}
      />
    </div>
  );
}

export default withSuspense(OrganizationsTable);
