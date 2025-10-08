import { User, Award } from 'lucide-react';

export default function ProfilePage() {
  const kelompok = {
    title: 'Kelompok Praktikum - Pemrograman Perangkat Bergerak',
    code: 'Kelompok 24',
    members: [
      { nim: '21120121140097', name: 'ARRADHIN ZIDAN ILYASA SUBIYANTORO' },
      { nim: '21120123140160', name: 'IZZAT FARRAS ALBAR' },
      { nim: '21120123130061', name: 'MUHAMMAD DANIAL IRFANI' },
      { nim: '21120123120035', name: 'AZZAM SYAIFUL ISLAM' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-blue-100 to-purple-200 flex justify-center items-start pt-16 pb-20">
      <div className="max-w-5xl w-full mx-auto px-4 md:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{kelompok.title}</h1>
              <p className="text-sm text-gray-700">{kelompok.code} • {kelompok.supervisor}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" /> Anggota Kelompok
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="py-3 px-4">No.</th>
                    <th className="py-3 px-4">NIM</th>
                    <th className="py-3 px-4">Nama Lengkap</th>
                  </tr>
                </thead>
                <tbody>
                  {kelompok.members.map((m, i) => (
                    <tr key={m.nim} className={`border-t ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="py-3 px-4 align-top w-12">{i + 1}</td>
                      <td className="py-3 px-4 align-top font-mono text-sm text-gray-800">{m.nim}</td>
                      <td className="py-3 px-4 align-top text-gray-900 font-semibold">{m.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
