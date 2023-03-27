import {
  cacheExchange, ClientOptions,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/core"

export const endpoint = "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clfr37vlg0qdv01uievgd4muq/master"
export const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2Nzk5NDAwNDcsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xmcjM3dmxnMHFkdjAxdWlldmdkNG11cS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNTQyMzY2ZmItNjQ0NS00NzY3LThkZjAtMzA1Y2U3NTAwMjEzIiwianRpIjoiY2xmcjR4Z3hwMHJ0bzAxdW85bHNvOXBtaCJ9.uM0dddD6uhHJcO9-ZscvdfSLTp18dESAnboEw04v2idBmt3hbR0tKHQxYvevvau-nR4XSzVicyZoJxnfCZZKK7opvAWIxo91Q0Nv8UNA2vkiskfOrk_X2Y-zX8jHVgNEnrUSfKqzcHa62muWuL7juHeaVHAgOAoB3ct9-f6TgDmwHr02PBdPtkGjrhZkOAsWuXg9yGqspivC8B605yjJ_-PyTy4_Xg6OiWXL1whrUgfKJ_RuUU6wFIVi0pXcEBjIFGbpffdzdYY5TkxrTmPkBLOppMkLWBF2cV933j7VQsz4FdDHSNaf165JnBhqGrOMzSZRUKGe3wrVnL5HbOQ_AMoQi212syS0W9UFgNwRYpFN7li9WjMF5MQRU7lMJzsfSNmJIEIKZtyRuhEanmq-Fa-qAtJPK6HEnuhBwaecswWCSQq-OTyuIV8cPjeqvbstv7WjSrqjmb3uhjw6PycLw1TO8Oc-NtmT69WTlzHo75drjE3fb5zKCcEDwflYxJIJ75eUBeNWWxMfhxvNnDFQjsOqyujeZCoXFQliknOGpsp_IaCkt1TtzkQ5EiEd2gGVfmpjoOAnU2nPd7JKKxozxsEEmT7eGcThUbpbgoxlg606cUCrPV8Oxo5q16YlHQ7GBcpWoL_XoGEJR0eLZQ9IJNjrCXgk3rPK5pIk8SFXBu8";

export const clientConfig: ClientOptions = {
  url: endpoint,
  fetchOptions: {
    headers: {
      authorization: `Bearer ${ token }`
    }
  },
  exchanges: [ dedupExchange, ssrExchange(), fetchExchange ],
}

export const client = createClient(clientConfig)

export type QueryVariables = {
  [k: string]: string | number;
} | null | undefined;

export const queryClient = async <TData>(
  query: string,
  queryVars?: QueryVariables
): Promise<TData> =>
  client
  .query<TData>(query, queryVars ?? undefined)
  .toPromise()
  .then((res) => res.data as unknown as TData)