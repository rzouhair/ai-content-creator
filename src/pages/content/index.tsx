import { getDocuments } from '@/api/documents';
import LayoutMain from '@/components/Layouts/LayoutMain';
import React, { useEffect, useState } from 'react'
import { Document } from '@/lib/@types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

function Content() {

  const router = useRouter()
  const [documents, setDocuments] = useState<Document[] | undefined>()

  useEffect(() => {
    async function fetchDocuments() {
      const docs = await getDocuments()

      console.log({ docs })
      setDocuments(docs)
    }

    fetchDocuments()
  }, [])
  

  return (
    <div>
      <table
        role="table"
        className="min-w-full text-left divide-y divide-gray-200 w-full"
      >
        <thead className="bg-gray-50">
          <tr role="row">
            <th scope="col" className="relative px-4 w-3 bg-gray-100">
              <input
                type="checkbox"
                className="form-checkbox absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
              />
            </th>
            <th
              colSpan={1}
              role="columnheader"
              className="uppercase text-xs px-6 py-2 font-semibold text-left text-gray-500 whitespace-nowrap"
              style={{width: '45%'}}
            >
              <span>Name</span>
            </th>
            <th
              colSpan={1}
              role="columnheader"
              className="uppercase text-xs px-6 py-2 font-semibold text-left text-gray-500 whitespace-nowrap"
              style={{ width: 'auto' }}
            >
              <span>Created by</span>
            </th>
            <th
              colSpan={1}
              role="columnheader"
              className="uppercase text-xs px-6 py-2 font-semibold text-left text-gray-500 whitespace-nowrap"
              style={{ width: 'auto' }}
            >
              <span>Modified</span>
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" className="bg-white divide-y divide-gray-100">
          {
            documents?.map((doc: Document) => {
              return <tr key={doc._id} role="row" onClick={(e) => router.push(`/content/${doc._id}`)} className="cursor-pointer hover:bg-gray-50">
                <td className="relative px-4 w-3">
                  <div className="w-4 h-4">
                    <input
                      type="checkbox"
                      className="form-checkbox absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 invisible"
                      value="c98ef044-883c-4e10-85c3-8b3708adef08"
                    />
                  </div>
                </td>
                <td
                  role="cell"
                  className="px-6 py-2 whitespace-nowrap font-medium text-sm text-gray-800 truncate max-w-xl"
                >
                  { doc.name || 'Untitled' }
                </td>
                <td
                  role="cell"
                  className="px-6 py-2 whitespace-nowrap text-gray-600 text-xs truncate max-w-xl"
                >
                  me
                </td>
                <td
                  role="cell"
                  className="px-6 py-2 whitespace-nowrap text-gray-600 text-xs truncate max-w-xl"
                >
                  { dayjs(doc.created_at).format('MMM, DD YYYY') }
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

Content.getLayout = function getLayout(page: any) {
  return <LayoutMain>{page}</LayoutMain>;
}

export default Content