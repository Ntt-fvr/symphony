export type Organization = OptionalRefTypeWrapper<organization>;
export type OrganizationBase = OptionalRefTypeWrapper<organization_base>;

const ORGS = {
  organizations: {
    edges: [
      {
        node: {
          id: '234748364800',
          name: 'everis',
          description: 'everis Latam SAS',
          members: [
            {
              id: '214748364800',
              authID: 'fbuser@fb.com',
              firstName: '',
              lastName: '',
              email: 'fbuser@fb.com',
              status: 'ACTIVE',
              role: 'OWNER',
            },
          ],
        },
      },
    ],
  },
};
const ORGS_EMPTY = {
  organizations: {
    edges: [],
  },
};
const ORG = {
  organization: {
    id: '234748364800',
    name: 'everis',
    description: 'everis Latam SAS',
    members: [
      {
        id: '214748364800',
        authID: 'fbuser@fb.com',
        firstName: '',
        lastName: '',
        email: 'fbuser@fb.com',
        status: 'ACTIVE',
        role: 'OWNER',
      },
    ],
  },
};
export function useOrganizations(): $ReadOnlyArray<Organization> {
  const data = ORGS; //useLazyLoadQuery<OrganizationsQuery>(organizationsQuery, {});
  const organizationsData = data.organizations?.edges || [];
  return organizationsData.map(p => p.node).filter(Boolean);
}

export function useOrganization(orgId: string): Organization {
  // const data = useLazyLoadQuery<UsersGroupsSearchQuery>(groupQuery, {
  //   groupId,
  // });
  // $FlowFixMe[incompatible-return] $FlowFixMe T74239404 Found via relay types
  const data = ORG;
  return data.organization;
}

//MOCK
export function editOrganization(
  newOrganizationValue: Organization,
): Organization {
  return ORG;
}
export function addOrganization(
  newOrganizationValue: Organization,
): Organization {
  return ORG;
}
// export function editOrganization(
//   newOrganizationValue: Organization,
// ): Promise<EditOrganizationMutationResponse> {
//   return new Promise<EditOrganizationMutationResponse>((resolve, reject) => {
//     const callbacks: MutationCallbacks<EditOrganizationMutationResponse> = {
//       onCompleted: (response, errors) => {
//         if (errors && errors[0]) {
//           reject(getGraphError(errors[0]));
//         }
//         resolve(response);
//       },
//       onError: e => {
//         reject(getGraphError(e));
//       },
//     };
//     EditOrganizationMutation(
//       {
//         input: {
//           id: newOrganizationValue.id,
//           name: newOrganizationValue.name,
//           description: newOrganizationValue.description,
//         },
//       },
//       callbacks,
//     );
//   });
// }
