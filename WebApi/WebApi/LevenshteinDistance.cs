using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace WebApi
{
    public class LevenshteinDistanceDto
    {
        public string string1 { get; set; }
        public string string2 { get; set; }
        public List<List<int>> matrix { get; set; }
        public int LevenshteinDistance { get; set; }

    }
    public static class LevenshteinDistanceCls
    {

        public static LevenshteinDistanceDto LevenshteinDistance(string s, string t)
        {
            int n = s.Length;
            int m = t.Length;
            int[,] d = new int[n + 1, m + 1];


            for (int i = 0; i <= n; i++)
                d[i, 0] = i;
            for (int j = 0; j <= m; j++)
                d[0, j] = j;

            for (int j = 1; j <= m; j++)
                for (int i = 1; i <= n; i++)
                    if (s[i - 1] == t[j - 1])
                        d[i, j] = d[i - 1, j - 1];  //no operation
                    else
                        d[i, j] = Math.Min(Math.Min(
                                d[i - 1, j] + 1,    //a deletion
                                d[i, j - 1] + 1),   //an insertion
                            d[i - 1, j - 1] + 1 //a substitution
                        );

            var mtrx = new List<List<int>>();

            for (var i = 0; i < n; i++)
            {
                var ln = new List<int>();
                for (var j = 0; j < n; j++)
                {
                    //Console.Write(d[i, j]);
                    ln.Add(d[i, j]);
                }
                //Console.WriteLine();
                mtrx.Add(ln);
            }

            Console.WriteLine(JsonConvert.SerializeObject(mtrx));

            return new LevenshteinDistanceDto() { string1 = s, string2 = t, LevenshteinDistance = d[n, m], matrix = mtrx };
        }
    }
}
