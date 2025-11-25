'use client'

import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

interface CaseStudy {
  id: number
  title: string
  description: string
  created_at: string
}

export default function CaseStudiesList() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const limit = 5 // items per page

  const fetchCaseStudies = async (page: number) => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/casestudies?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error('Failed to fetch case studies')
      const data = await res.json()

      setCaseStudies(data.caseStudies || [])
      const totalCount = data.total || data.caseStudies?.length || 0
      setTotalPages(Math.ceil(totalCount / limit) || 1)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseStudies(page)
  }, [page])

  const goToPage = (p: number) => setPage(p)

  const handleCreate = () => {
    // Navigate to create page (adjust route if needed)
    window.location.href = '/admin/casestudies/add'
  }

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-sky-700 to-indigo-700 text-white rounded-xl shadow-lg p-4">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-white text-sky-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FaPlus /> Create Case Study
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <div className="text-gray-500">Loading case studies...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && caseStudies.length === 0 && (
        <div className="text-gray-500">No case studies found.</div>
      )}

      {/* Case Studies List */}
      <ul className="space-y-4">
        {caseStudies.map((cs) => (
          <li key={cs.id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-xl">{cs.title}</h2>
            <p className="text-gray-700 mt-1">{cs.description}</p>
            <span className="text-sm text-gray-400 mt-1 block">
              {new Date(cs.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 rounded border ${
                p === page
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
