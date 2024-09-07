SELECT stock_symbol
FROM (
    SELECT stock_symbol, (accuracy_score * COUNT(*)) AS w_sc 
    FROM postgres.dbo.stock_results sr 
    WHERE prediction = true 
    GROUP BY stock_symbol, accuracy_score 

    UNION 

    SELECT stock_symbol, (-accuracy_score * COUNT(*)) AS w_sc 
    FROM postgres.dbo.stock_results sr2
    WHERE prediction = false 
    GROUP BY stock_symbol, accuracy_score 
) AS combined_results
GROUP BY stock_symbol
ORDER BY SUM(w_sc)
LIMIT 10